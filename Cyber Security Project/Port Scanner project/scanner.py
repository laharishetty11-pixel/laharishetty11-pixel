import socket
import time

target = input("Enter Target IP or Website: ")

print(f"\nScanning Target: {target}\n")

report = open("scan_report.txt", "w")

start_time = time.time()

for port in range(1, 101):

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    socket.setdefaulttimeout(0.5)

    result = s.connect_ex((target, port))

    if result == 0:

        try:
            service = socket.getservbyport(port)
        except:
            service = "Unknown"

        output = f"Port {port} is OPEN --> {service}"

        print(output)

        report.write(output + "\n")

    s.close()

end_time = time.time()

total_time = end_time - start_time

print(f"\nScan completed in {total_time:.2f} seconds")

report.write(f"\nScan completed in {total_time:.2f} seconds")

report.close()

print("\nReport saved as scan_report.txt")