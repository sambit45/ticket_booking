package com.authentication.service.Controller;

import com.authentication.service.Repository.UserRepository;
import com.authentication.service.Response.AuthResponse;
import com.authentication.service.ServicePackage.UserDetailsService;
import com.authentication.service.model.LoginRequest;
import com.authentication.service.model.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody User user) throws Exception {
        Optional<User> isUserExist = userRepository.findByEmail(user.getEmail());
        if(!isUserExist.isPresent())
        {
            throw new Exception("Email already exists with another account..!");
        }
        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Signup Success..!");
        authResponse.setJwt("None");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        String jwt = userService.verify(loginRequest);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Signin Success..!");
        authResponse.setJwt(jwt);

        return new ResponseEntity<>(authResponse,HttpStatus.CREATED);
    }

}

