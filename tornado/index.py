#!/usr/bin/env python3
import tornado.ioloop
import tornado.web
import random
import json

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")
class RandomHandler(tornado.web.RequestHandler):
    def get(self):
        randArray = []
        for i in range(1, 7):
            randArray.append(random.randrange(1, 100, 1))
        resultString = ','.join(map(str, randArray))
        self.write({'message': resultString})

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/random", RandomHandler)
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
