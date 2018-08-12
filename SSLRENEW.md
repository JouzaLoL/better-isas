# Renewing SSL Certificate

1. https://www.sslforfree.com/create?domains=isas.zlepsi.me
2. Manual verification
3. Download file
4. Move it to ./public/.well-known/acme-challenge
5. openode deploy
6. Download Certificate
7. Rename it to domain-crt/key.pem and move to ./sslcert
8. PowerShell with Admin access:  Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
9. Restart
10. Install WSL Ubuntu from Windows Store
11. https://docs.travis-ci.com/user/encrypting-files
12. Done