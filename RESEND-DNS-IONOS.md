# Superseded: do not use these records for Invoingo

The intended app sending domain is invoingo.com. The records below belong to receitra.com and must not be copied to invoingo.com. Correct records must be retrieved from the existing Invoingo Resend team.

# Resend sending setup for receitra.com at IONOS

Open Domains & SSL → receitra.com → DNS → Add record. Add or correct these sending records. IONOS appends receitra.com to the host names below. Preserve existing root MX records and unrelated records. Inbound receiving is not needed.

## TXT — resend._domainkey

Value:
```text
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCr4nvCyDYr+8LfGhg0bbFsXngDf3do0LEPND1hRejSkNw0hJyLnmWBmNLSNmkSVdCom6FO+yBiAYZy5DK5QKnrbrSNJRjfYIm6pzccQlt7xcb+YfzAsi/qgdD8uHa2hI7pTaQiMcugRkyyb7ll+VpTlQcFHLIrpd9nYqYjiD/miQIDAQAB
```

## MX — send

Value:
```text
feedback-smtp.us-east-1.amazonses.com
```

Priority: 10

## TXT — send

Value:
```text
v=spf1 include:amazonses.com ~all
```

After saving, verify receitra.com in Resend. Connections → Resend / IONOS setup displays current status. Retry queued receipts after verification succeeds. Public HTTPS hosting is separately required for customer payment links and incoming webhooks. Secrets remain in the ignored local .env file.
