#Created by james hartley

from flask import Flask, render_template

import requests
import re
from bs4 import BeautifulSoup

app = Flask(__name__)
app._static_folder = 'static'


@app.route('/')
def main_page():
    return render_template('index.html')

@app.route('/fb')
def main_page2():
    return render_template('index.html')

@app.route('/fb/<jsdata>')
def get_javascript_data(jsdata):
    url = "http://www.facebook.com/" + jsdata
    print(url)

    # FB Identification
    page = requests.get(url)
    print("Got Request")
    soup=BeautifulSoup(page.content,"html.parser")
    print("Made Soup")
    fbid = soup.find("meta",  property="al:android:url")
    strfbid = str(fbid)
    print("Made fbid = " + strfbid)
    # Result
    x = re.search("\d+", strfbid)
    print("ID = ")
    print(x[0])
    return x[0]

if __name__ == "__main__":
	app.run("0.0.0.0", "5000")