import express from "express";

export default interface ApiController {
  getAll: express.RequestHandler;
  getById: express.RequestHandler;
  create: express.RequestHandler;
  update: express.RequestHandler;
  delete: express.RequestHandler;
}
