from sqlalchemy import create_engine
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask
import pandas as pd
import os

load_dotenv()
db_password = os.getenv("db_password")
db_username = os.getenv("db_username")
db_url = os.getenv("db_url")
db_port = os.getenv("db_port")
db_name = os.getenv("db_name")
db_table = os.getenv("db_table")

app = Flask(__name__)
# Set CORS to accept any and all traffic (mostly for convenience)
cors = CORS(app)

# A route for pulling data based on a trip's ID number
@app.route("/data/<trip_id>",methods=['GET','POST'])
@app.route("/data",methods=['GET','POST'])
def tripData(trip_id=None):

   # Establish the connection to the database
   db_string = f"postgresql://{db_username}:{db_password}@{db_url}:{db_port}/{db_name}"
   engine = create_engine(db_string)
   
   if trip_id:
      # Select the rows with the desired trip ID
      data = pd.read_sql(f"SELECT * FROM {db_table} WHERE trip_id='{trip_id}' ", con=engine)
   else:
      # If no selection is made, it should be during the init() function call and pull all data from the table to populate the dropdown
      data = pd.read_sql(f"SELECT * FROM {db_table} ", con=engine)

   # Set the index to be the time_stamp column   
   data.set_index("time_stamp")

   # Avoid having to_csv add an index column when the data gets passed
   return data.to_csv(index=False)
   
if __name__ == "__main__":
    app.run(debug=True)