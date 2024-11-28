import os
import sys

def search_files(directory, search_string):
    """
    Recursively search for files containing the search string in the given directory.
    """
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', errors='ignore') as f:
                    for line_number, line in enumerate(f, start=1):
                        if search_string in line:
                            print(f"Found in {file_path} on line {line_number}: {line.strip()}")
            except Exception as e:
                print(f"Could not read file {file_path}: {e}")

def main():
    # if len(sys.argv) != 3:
    #     print("Usage: python search_files.py <directory> <search_string>")
    #     sys.exit(1)

    directory = '.'
    search_string = "hi"

    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a valid directory.")
        sys.exit(1)

    search_files(directory, search_string)

if __name__ == "__main__":
    main()
