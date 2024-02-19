send_email() {
    local subject=$1
    local body=$2
    local recipient="aleksandar.matejic994@gmail.com"
    echo -e "Subject:$subject\n$body" | sendmail $recipient
}

echo "Starting the data extraction pipeline..."
node crawler.js

if [ $? -eq 0 ]; then
    echo "Data extraction pipeline completed successfully."
    send_email "Pipeline Completed" "The data extraction pipeline has completed successfully."
else
    echo "Error: Data extraction pipeline failed."
    send_email "Pipeline Failed" "The data extraction pipeline has failed. Please check the logs for more information."
fi
