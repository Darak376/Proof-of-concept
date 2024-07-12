from flask import Flask, render_template, request
from transformers import pipeline

app = Flask(__name__)

sentiment_analyzer = pipeline('sentiment-analysis')
ner_analyzer = pipeline('ner', grouped_entities=True)
summarizer = pipeline('summarization')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.form['text']
    analysis_type = request.form['analysis_type']
    
    if analysis_type == 'Sentiment Analysis':
        result = sentiment_analyzer(text)
    elif analysis_type == 'Named Entity Recognition':
        result = ner_analyzer(text)
    elif analysis_type == 'Summarization':
        result = summarizer(text, max_length=50, min_length=25, do_sample=False)
    else:
        result = "Invalid analysis type selected."
    
    return render_template('result.html', result=result, analysis_type=analysis_type)

if __name__ == '__main__':
    app.run(debug=True)
