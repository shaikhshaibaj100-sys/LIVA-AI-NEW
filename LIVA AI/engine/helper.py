def extract_yt_search_term(query):
    pattern = r"play\s+(.*?)\s+on\s+youtube"
    match = re.search(pattern, query, re.IGNORECASE)
    return match.group(1) if match else None