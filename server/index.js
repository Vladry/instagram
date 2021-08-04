const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const User = require('/models/user');

const app = express();
app.use(express.json());
app.use(BodyParser.json());