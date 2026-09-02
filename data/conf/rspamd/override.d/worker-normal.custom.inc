# PorterMail: rede desta VPS tem latencia maior pra DNS externo (RBL/URIBL) -
# 25s (padrao do mailcow) as vezes estoura em mensagens com varias URLs,
# forcando soft reject por timeout. Aumentado para dar folga real.
task_timeout = 45s;
