package com.sleizware.infomarket.sellers;

import com.sleizware.infomarket.items.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/infomarket/v1/seller")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers() {
        return new ResponseEntity<List<Seller>>(sellerRepository.findAll(), HttpStatus.OK);
    }

    // Sign-up Endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> registerSeller(@RequestBody Seller seller) {
        if (sellerRepository.findBySellerEmail(seller.getSeller_email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        String name = seller.getSeller_name();

        sellerRepository.save(seller);
        return ResponseEntity.status(HttpStatus.CREATED).body("Glad to have you aboard " + name + "!");
    }

    // Sign-in Endpoint
    @PostMapping("/auth")
    public ResponseEntity<Map<String, String>> loginSeller(@RequestBody LoginRequest request) {
        String email = request.getSeller_email();
        String password = request.getPassword();

        Optional<Seller> sellerOpt = sellerRepository.findBySellerEmail(email);
        if (sellerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid credentials"));
        }

        Seller seller = sellerOpt.get();
        if (!seller.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Incorrect Password"));
        }

        String name = seller.getSeller_name();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome back " + name + "!");
        response.put("name", seller.getSeller_name());
        response.put("phone", seller.getSeller_phone());

        return ResponseEntity.ok(response);
    }
}

