# import pandas as pd
# import numpy as np
# filename = "./ml/data_zenton.csv"

# data=pd.read_csv(filename, sep = ",", names=["torso_angle", "knee_angle"])
# # print(data)

# params = {}
# datapoints = [15,20,25,30,35,40] # torso angle
# c = 0

# # decide paremeters based on data
# params = {}
# for i in datapoints:
#     knee = (data[(data['torso_angle'] > i-1) & (data['torso_angle'] < i+1)]).loc[:, ('knee_angle')]
#     if len(knee) > 5:
#         mean = np.mean(knee)
#         std = np.std(knee)
#         lower_bound = mean-std
#         upper_bound = mean+std
#         # print(f"{datapoints[c]}: {lower_bound} , {mean}, {upper_bound}")
#         params[i] = (lower_bound, upper_bound)
#     c+=1
# print(filename, params)

params = {15: (155.20629150332175, 173.4336280483478), 20: (142.22333275193554, 164.37811710669254), 25: (122.09263121988019, 158.23478020870758), 30: (107.34771709766484, 124.14340580251492), 35: (66.12014870264625, 102.07363595217234), 40: (94.23036469212472, 135.11031077465395)}

def determine_posture(knee_angle, torso_angle, params):
    datapoints = [15,20,25,30,35,40]
    i = params[datapoints[round(torso_angle/5)-3]]
    print(i[0])
    if knee_angle > i[0]:
        if knee_angle < i[1]:
            message = 'good posture'
            print(message)
            return (0, message)
        else:
            message = 'your back is too high'
            print(message)
            return (1, message)
    else:
        message = 'your back is too low'
        print(message)
        return -1, message

determine_posture(80, 34, params)