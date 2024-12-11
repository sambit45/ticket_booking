package com.authentication.service.Controller;

import com.authentication.service.ServicePackage.UserDetailsService;
import com.authentication.service.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserDetailsService userService;

    @GetMapping("/home")
    public String basic(){
        return "Hello";
    }

    @PostMapping("/auth/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/auth/login")
    public String login(@RequestBody User user){
        return userService.verify(user);
    }

}

