import random
import time

roadNumber = 9
length = 57621883

def generateDataString(roadNumber, length):
    resultString = ""
    maxNumber = 2 ** roadNumber


    iterations = (length + roadNumber - 1) // roadNumber

    for i in range(iterations):
        randomNumber = random.randint(0, maxNumber - 1)
        binaryString = format(randomNumber, f'0{roadNumber}b')
        translationTable = str.maketrans('01', 'BP')
        binaryPattern = binaryString.translate(translationTable)
        resultString += binaryPattern

    return resultString

for i in range(8):
    start_time = time.time()
    myString = generateDataString(roadNumber, length)
    end_time = time.time()
    elapsed_time = end_time - start_time
    try:
        with open(f'../src/data/routeData{i + 1}.tsx', 'w') as file:
            file.write(f"module.exports = {repr(myString)};")
            print(f"Time taken: {elapsed_time} seconds")

    except Exception as err:
        print(f"Error: {err}")