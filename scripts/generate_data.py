import os
import math
import random

numOfParts = 4
<<<<<<< HEAD
DEFAULT_DATA_LENGTH = (22 * 2 ** 22) / numOfParts
=======
DEFAULT_DATA_LENGTH = (22 * 2 ** 22) * 1.5 / numOfParts
>>>>>>> len-22-build
dataLength = DEFAULT_DATA_LENGTH
listOfRouteNames = [9, 3, 4]



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
<<<<<<< HEAD
            with open(f'../src/data/testData/routeData{routeNumber}-{j}.js', 'w') as f:
=======
            with open(f'../src/len-22-data/routeData{routeNumber}-{j}.js', 'w') as f:
>>>>>>> len-22-build
                f.write(f"module.exports = {repr(myString)};")
            end_time = os.times()[4]
            elapsed_time = end_time - start_time
            print(f'Time taken: {elapsed_time} seconds')
        except Exception as err:
            print(f'Error: {err}')
