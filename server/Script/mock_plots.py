import time
import random
import json
import sys

def show_progress(duration=10, interval=0.5):
    plots = {"x": [], "y": []}
    steps = int(duration / interval)
    for i in range(steps + 1):
        progress = int((i / steps) * 100)
        print(f"Progress: {progress}%", file=sys.stderr, flush=True)  # Send progress to stderr
        plots["x"].append(i)
        plots["y"].append(random.random())
        time.sleep(interval)
    print(json.dumps(plots, ensure_ascii=False))  # Output final JSON to stdout

if __name__ == "__main__":
    show_progress()