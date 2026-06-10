from requests import get

print(get('https://oss.exercisedb.dev/api/v1/exercises').content)