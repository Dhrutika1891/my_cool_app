import time
import sys


def show_progress():
    # Simulate a process with incremental progress updates
    for i in range(0, 101, 5):  # Progress from 0% to 100% in steps of 5%
        print(f"Progress:{i}%")  # Output progress to stdout
        sys.stdout.flush()  # Ensure the output is sent immediately
        time.sleep(1)  # Wait for 1 second to simulate a slow process

    # Final output (optional)
    print('{"status": "completed", "message": "Process finished successfully"}')
    sys.stdout.flush()


if __name__ == "__main__":
    show_progress()