#!/bin/bash
# PorterMail: reaproveita o certificado que o Nginx Proxy Manager ja renova
# sozinho, em vez de brigar pelo desafio ACME (NPM intercepta
# /.well-known/acme-challenge/ com force-ssl antes do proxy_pass alcancar o
# mailcow, entao o acme-mailcow nativo nao completa a validacao atras dele).
# Caminhos abaixo sao especificos deste servidor - ajuste se reusar em outro:
# SRC_DIR = pasta live/npm-N do certificado do host mail.* no NPM (o numero
# muda conforme a ordem de criacao dos certificados nesse NPM).
set -e
SRC_DIR="/opt/app/proxy/letsencrypt/live/npm-4"
DST_DIR="/opt/app/webmail/data/assets/ssl"
if [ ! -f "$SRC_DIR/fullchain.pem" ] || [ ! -f "$SRC_DIR/privkey.pem" ]; then
  echo "$(date): source cert not found, skipping" >> /var/log/npm-cert-sync.log
  exit 1
fi
if ! cmp -s "$SRC_DIR/fullchain.pem" "$DST_DIR/cert.pem"; then
  cp "$SRC_DIR/fullchain.pem" "$DST_DIR/cert.pem"
  cp "$SRC_DIR/privkey.pem" "$DST_DIR/key.pem"
  chmod 600 "$DST_DIR/key.pem"
  cd /opt/app/webmail && docker compose restart postfix-mailcow dovecot-mailcow nginx-mailcow >> /var/log/npm-cert-sync.log 2>&1
  echo "$(date): certificate updated and mailcow services restarted" >> /var/log/npm-cert-sync.log
fi
