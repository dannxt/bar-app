import random
import time

def generateDataString(roadNumber, length):
    resultString = ""
    maxNumber = 2 ** roadNumber
    iterations = (length + roadNumber - 1) // roadNumber

    for i in range(iterations):
        randomNumber = random.randint(0, maxNumber - 1)
        binaryString = bin(randomNumber)[2:]  # Convert to binary string (remove '0b' prefix)
        binaryPattern = "".join(["B" if digit == "1" else "P" for digit in binaryString])
        resultString += binaryPattern

    return resultString

roadNumber = 9
length = 40


for i in range(1):
    start_time = time.time()
    myString = generateDataString(roadNumber, length)
    end_time = time.time()
    elapsed_time = end_time - start_time
    try:
        with open(f'../src/data/routeData{i}.tsx', 'w') as file:
            file.write(f"module.exports = {repr(myString)};")
            print(f"Time taken: {elapsed_time} seconds")

    except Exception as err:
        print(f"Error: {err}")