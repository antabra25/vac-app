import os
import pickle


def shutdown_config():
    if os.path.isfile(".run_log"):
        deployments = pickle.load(open(".run_log", "rb")) + 1
        print(deployments)
        pickle.dump(deployments, open(".run_log", "wb"))
    else:

        pickle.dump(1, open(".run_log", "wb"))
