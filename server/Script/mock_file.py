import time
import sys
import random


def show_progress(duration=10, interval=0.5):
    plots = {"x": [], "y": []}
    steps = int(duration / interval)
    for i in range(steps + 1):
        progress = int((i / steps) * 100)
        print(f"Progress:{progress}%")
        plots["x"].append(i)
        plots["y"].append(random.random())
        # If you want the printing to be in place
        # sys.stdout.write(f"\rProgress:{progress}%")
        # sys.stdout.flush()
        time.sleep(interval)
    print('Success:{fileLocation:"/scans/myawesomescan.laz"}')

if __name__ == "__main__":
    show_progress()