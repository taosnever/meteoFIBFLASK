from flask import Flask, jsonify, session, redirect, url_for, escape, request, render_template, redirect, flash
from forms import ContactForm
from flask.ext.mail import Message, Mail

app = Flask(__name__)

mail = Mail() 
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = 'contact@example.com'
app.config["MAIL_PASSWORD"] = 'your-password' 
mail.init_app(app)

@app.route('/')
def home():
	return render_template('home.html')

@app.route('/home.html')
def homeHTML():
	return render_template('home.html')

@app.route('/contacto.html')
def contactoHTML():
	return render_template('contacto.html')

@app.route('/estadisticas.html')
def estadisticasHTML():
	return render_template('estadisticas.html')

@app.route('/medicion.html')
def medicionHTML():
	return render_template('medicion.html')

@app.route('/nosotros.html')
def nosotrosHTML():
	return render_template('nosotros.html')


@app.route('/showmaps')
def maps():
	return render_template('mapsShow.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
	form = ContactForm()
	if request.method == 'POST':
		if form.validate() == False:
			flash('All fields are required.')
			return render_template('contact.html', form=form)
		else:
			msg = Message(form.subject.data, sender='contact@example.com', recipients=['your_email@example.com'])
			msg.body = """
			From: %s &lt;%s&gt;
			%s
			""" % (form.name.data, form.email.data, form.message.data)
			mail.send(msg)
			return render_template('contact.html', success=True)
 
	elif request.method == 'GET':
		return render_template('contact.html', form=form)



if __name__ == '__main__':
	app.run()
		
