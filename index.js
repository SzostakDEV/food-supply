"use strict";
const express = require('express');
const app = express();
const { Core } = require('./core/Core');
const { RouteBootstrap } = require('./core/route/RouteBootstrap');
const { DatabaseBootstrap } = require('./core/db/DatabaseBootstrap');
const { ControllerBootstrap } = require('./core/controller/ControllerBootstrap');

Core.run(app, [DatabaseBootstrap, ControllerBootstrap, RouteBootstrap]);
