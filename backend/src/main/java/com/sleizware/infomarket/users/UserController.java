package com.sleizware.infomarket.users;

import com.sleizware.infomarket.sellers.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/infomarket/v1")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/user/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        String name = user.getUsername();

        user.setUserClass("Regular");
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Glad to have you aboard " + name + "!");
    }


    @PostMapping("/user/auth")
    public ResponseEntity<Map<String, String>> loginSeller(@RequestBody SignUp request) {
        String email = request.getEmail();
        String password = request.getPassword();

        Optional<User> userOpt = userRepository.findUserByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid credentials"));
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Incorrect Password"));
        }

        String name = user.getUsername();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome back " + name + "!");
        response.put("name", user.getUsername());
        response.put("phone", user.getPhone());

        return ResponseEntity.ok(response);
    }
}
