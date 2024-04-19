package com.supership.ship.api;

import com.supership.ship.exception.UserException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HandleExceptionAPI {
    @ExceptionHandler(UserException.class)
    public String handleUserException(UserException ex, Model model){
        model.addAttribute("error", ex);
        return "error";
    }
}
