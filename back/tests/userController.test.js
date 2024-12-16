import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

jest.mock('../models/userModel.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Registration', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return success when a new user is registered', async () => {
      const mockReqBody = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'strongpassword123',
      };
  
      userModel.findOne.mockResolvedValue(null); 
      bcrypt.genSalt.mockResolvedValue('somesalt');
      bcrypt.hash.mockResolvedValue('hashedpassword');
      userModel.prototype.save = jest.fn().mockResolvedValue({
        _id: 'mockUserId',
        ...mockReqBody,
        password: 'hashedpassword',
      });
      jwt.sign.mockReturnValue('mockJwtToken');
  
      const res = await request(app).post('/api/user/register').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBe('mockJwtToken');
      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockReqBody.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(mockReqBody.password, 'somesalt');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'mockUserId' }, process.env.JWT_SECRET);
    });
  
    it('should return an error if the user already exists', async () => {
      const mockReqBody = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'strongpassword123',
      };
  
      userModel.findOne.mockResolvedValue({ email: 'john@example.com' });
  
      const res = await request(app).post('/api/user/register').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('User already exists');
      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockReqBody.email });
    });
  
    it('should return an error if the email is invalid', async () => {
      const mockReqBody = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'strongpassword123',
      };
  
      userModel.findOne.mockResolvedValue(null);

      const res = await request(app).post('/api/user/register').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Please enter a valid email');
    });
  
    it('should return an error if the password is weak', async () => {
      const mockReqBody = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
      };

      userModel.findOne.mockResolvedValue(null);
  
      const res = await request(app).post('/api/user/register').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Please enter a strong password');
    });
  
    it('should handle server errors gracefully', async () => {
      const mockReqBody = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'strongpassword123',
      };
  
      userModel.findOne.mockRejectedValue(new Error('Database error'));
  
      const res = await request(app).post('/api/user/register').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Database error');
    });
  });

  describe('User Login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return success when credentials are valid', async () => {
      const mockReqBody = {
        email: 'john@example.com',
        password: 'correctpassword',
      };
  
      userModel.findOne.mockResolvedValue({
        _id: 'mockUserId',
        email: 'john@example.com',
        password: 'hashedpassword',
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockJwtToken');
  
      const res = await request(app).post('/api/user/login').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBe('mockJwtToken');
      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockReqBody.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(mockReqBody.password, 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'mockUserId' }, process.env.JWT_SECRET);
    });
  
    it('should return an error if the user does not exist', async () => {
      const mockReqBody = {
        email: 'unknown@example.com',
        password: 'somepassword',
      };
  
      userModel.findOne.mockResolvedValue(null);
  
      const res = await request(app).post('/api/user/login').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User dosen`t exists");
      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockReqBody.email });
    });
  
    it('should return an error if the password is incorrect', async () => {
      const mockReqBody = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };
  
      userModel.findOne.mockResolvedValue({
        _id: 'mockUserId',
        email: 'john@example.com',
        password: 'hashedpassword',
      });
      bcrypt.compare.mockResolvedValue(false);
  
      const res = await request(app).post('/api/user/login').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockReqBody.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(mockReqBody.password, 'hashedpassword');
    });
  
    it('should handle server errors gracefully', async () => {
      const mockReqBody = {
        email: 'john@example.com',
        password: 'somepassword',
      };
  
      userModel.findOne.mockRejectedValue(new Error('Database error'));
  
      const res = await request(app).post('/api/user/login').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Database error');
    });
  });

  describe('Admin Login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return success when admin credentials are valid', async () => {
      const mockReqBody = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      };
  
      jwt.sign.mockReturnValue('mockJwtToken');
  
      const res = await request(app).post('/api/user/admin').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBe('mockJwtToken');
      expect(jwt.sign).toHaveBeenCalledWith(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
        process.env.JWT_SECRET
      );
    });
  
    it('should return an error when admin credentials are invalid', async () => {
      const mockReqBody = {
        email: 'wrongadmin@example.com',
        password: 'wrongpassword',
      };
  
      const res = await request(app).post('/api/user/admin').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });
  
    it('should handle server errors gracefully', async () => {
      const mockReqBody = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      };
  
      jwt.sign.mockImplementation(() => {
        throw new Error('JWT signing error');
      });
  
      const res = await request(app).post('/api/user/admin').send(mockReqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('JWT signing error');
    });
  });
