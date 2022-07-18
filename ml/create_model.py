import pandas as pd
import numpy as np

data=pd.read_csv("./ml/data.csv", sep = ",", names=["torso_angle", "knee_angle"])
# print(data)

params = {}
datapoints = [15,20,25,30,35,40]
c = 0
# decide paremeters based on data
params = {}
for i in datapoints:
    knee = (data[(data['torso_angle'] > i-1) & (data['torso_angle'] < i+1)]).loc[:, ('knee_angle')]
    if len(knee) > 5:
        mean = np.mean(knee)
        std = np.std(knee)
        lower_bound = mean-std
        upper_bound = mean+std
        # print(f"{datapoints[c]}: {lower_bound} , {mean}, {upper_bound}")
        params[i] = (lower_bound, upper_bound)
    c+=1
print(params)

