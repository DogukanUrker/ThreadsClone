from secrets import token_urlsafe


SECERT_KEY = token_urlsafe(32)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRES_MINUTES = 600