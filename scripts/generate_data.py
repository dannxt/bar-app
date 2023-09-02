import os
import math
import random

numOfParts = 12
DEFAULT_DATA_LENGTH = (22 * 2 ** 22 * 3) / numOfParts
dataLength = DEFAULT_DATA_LENGTH
listOfRouteNames = [3]


def generateDataString(routeNumber, dataLength):
    resultString = ""
    maxNumber = 2 ** routeNumber

    iterations = math.ceil(dataLength / routeNumber)

    for i in range(iterations):
        randomNumber = random.randint(0, maxNumber - 1)
        binaryString = format(randomNumber, f'0{routeNumber}b')
        translationTable = str.maketrans('01', 'BP')
        binaryPattern = binaryString.translate(translationTable)
        resultString += binaryPattern
    return resultString


for routeNumber in listOfRouteNames:
    for j in range(1, numOfParts + 1):
        start_time = os.times()[4]
        myString = generateDataString(routeNumber, dataLength)
        try:
            with open(f'../len-22-333-data/routeData{routeNumber}-{j}.js', 'w') as f:
                f.write(f"module.exports = {repr(myString)};")
            end_time = os.times()[4]
            elapsed_time = end_time - start_time
            print(f'Time taken: {elapsed_time} seconds')
        except Exception as err:
            print(f'Error: {err}')
