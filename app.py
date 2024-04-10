from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

HOSTNAME = "localhost"
# MySQL监听的端口号，默认3306
PORT = 3306
# 连接MYSQL的用户名，读者用自己设置的
USERNAME = "new_user"
# 连接MySQL的密码，读者用自己的
PASSWORD = "user_password"
# MySQL上创建的数据库名称
DATABASE = "flask"
app = Flask(__name__)

CORS(app)
# 在app.config中设置好连接数据库的信息
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{DATABASE}?charset=utf8"
# 然后使用SQLAlchemy(app)创建一个db对象
# SQLAlchemy会自动读取app.config中连接数据库的信息

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Articles(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))

    def __init__(self,title):
        self.title = title


@app.route("/")
def hello_world():
    return {
        "name": "chen"
    }


if __name__=='__main__':
    # # delete all table
    # db.drop_all()
    # # create all table
    # db.create_all()

    # article1 = Articles(title = 'alice')

    # db.session.add(role1)

    # db.session.commit()

    with app.app_context():
        # 删除所有表
        db.drop_all()
        # 创建所有表
        db.create_all()

        article1 = Articles(title='alice')
        db.session.add(article1)
        db.session.commit()

    app.run(host='0.0.0.0', port=5001, threaded=True)
