#!/bin/bash

# File containing list of files and folders to copy
file_list="script/files_to_copy.txt"

echo "Files and folders coping started!"

# Loop through each line in the file
while IFS= read -r line; do
  # Check if line is empty or a comment (starting with #)
  if [[ -z "$line" || $line =~ ^# ]]; then
    continue
  fi

  # Split the line into source and destination paths
  IFS=':' read -r source destination <<< "$line"  # Split on colon (:)

  # Check if destination path is provided
  if [[ -z "$destination" ]]; then
    echo "Error: Destination path missing for '$source'"
    continue
  fi

  echo "Copying '$source' to '$destination'"

  # Copy the file/folder with appropriate destination path
  cp -r "$source" "$destination"

done < "$file_list"

echo "Files and folders copied successfully!"
