from flask import Flask, request, jsonify, render_template
import pandas as pd
from textblob import TextBlob

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


#Name, Story, Address (Just Zip Code)
df = pd.DataFrame({"Name":["Bob","Will","Smith","Alex","Jamie"],
					   "Story":["I love the ELC breast cancer awareness! It made me take GOOD precaution to PREVENT it. I'm going to share this news!!",
					    	 	"This is app is really nice and FUN to use!",
					    	 	"I heard about this from a friend and tried it.. it's not bad",
					    	 	"",
					    	 	""],
					   "Address":["New York, NY","California, CA", "Mumbai, India", "", ""]})
	# df.drop('Unnamed: 0', inplace = True, axis = 1)
df.head()
df2 = df
df2["text"] = df2["Story"]

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
	#load the descriptions into textblob
	desc_blob = [TextBlob(desc) for desc in df2['text']]
	#add the sentiment metrics to the dataframe
	df2['tb_Pol'] = [b.sentiment.polarity for b in desc_blob]
	df2['tb_Subj'] = [b.sentiment.subjectivity for b in desc_blob]
	#show dataframe
	print("Like/Dislike:", df2['tb_Pol'])
	print("Bias:", df2['tb_Subj'])

    return render_template('index.html', prediction_text='Review: {}'.format(output))

@app.route('/predict_api',methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    prediction = predict()

    output = prediction[0]
    return jsonify(output)



if __name__ == "__main__":
    app.run(debug=True)
