
from wtforms import StringField, BooleanField, validators
from wtforms.validators import InputRequired, Email
#from flask_wtf import Form 
from wtforms.validators import Required
from flask.ext.wtf import Form
from wtforms.fields import TextField, TextAreaField, SubmitField

from wtforms.fields.html5 import EmailField

class ContactForm(Form):
	name = StringField("Name",  [InputRequired("Please enter your name.")])
	#email = EmailField("Email",  [InputRequired("Please enter your email address."), Email("This field requires a valid email address")])
	email = EmailField("Email", [validators.DataRequired(), validators.Email()])
	subject = StringField("Subject",  [InputRequired("Please enter a subject.")])
	message = TextAreaField("Message",  [InputRequired("Not including a message would be stupid")])
	submit = SubmitField("Send")