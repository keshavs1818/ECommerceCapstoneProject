package com.cogent.Capstone.exception;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@ControllerAdvice
//@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler{
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) throws Exception {
		
		ExceptionResponse e=new ExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		
			return new ResponseEntity(e,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	@ExceptionHandler(UserNotFoundException.class)
	public final ResponseEntity<Object> handleUserNotFoundExceptions(Exception ex, WebRequest request) throws Exception {
		
		ExceptionResponse e=new ExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		
			return new ResponseEntity(e,HttpStatus.NOT_FOUND);
		}
@Override
protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
		HttpHeaders headers, HttpStatusCode status, WebRequest request) {
	// TODO Auto-generated method stub
	ExceptionResponse e=new ExceptionResponse(new Date(),ex.getFieldError().getDefaultMessage(),request.getDescription(false));
	//ExceptionResponse e=new ExceptionResponse(new Date(),"Total errors: "+ex.getErrorCount()+" First Error: "+ex.getFieldError(),request.getDescription(false));
	return new ResponseEntity(e,HttpStatus.BAD_REQUEST);
}



}
