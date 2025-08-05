package com.sleizware.infomarket.sellers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/infomarket/v1")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/seller/signup")
    public ResponseEntity<String> registerSeller(@RequestBody Seller seller) {
        if (sellerRepository.findBySellerEmail(seller.getSellerEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        String name = seller.getSellerName();

        sellerRepository.save(seller);
        return ResponseEntity.status(HttpStatus.CREATED).body("Glad to have you aboard " + name + "!");
    }

    @PostMapping("/seller/auth")
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

        String name = seller.getSellerName();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome back " + name + "!");
        response.put("name", seller.getSellerName());
        response.put("phone", seller.getSellerName());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/seller/update")
    public ResponseEntity<String> updateSellerDetails(@RequestBody Seller updatedData) {
        Optional<Seller> sellerOpt = sellerRepository.findBySellerEmail(updatedData.getSellerEmail());
        if (sellerOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found.");
        }

        Seller seller = sellerOpt.get();
        seller.setSellerName(updatedData.getSellerName());
        seller.setSellerPhone(updatedData.getSellerPhone());
        seller.setDistribution(updatedData.getDistribution());
        seller.setPassword(updatedData.getPassword());
        seller.setProfilePicture(updatedData.getProfilePicture());

        sellerRepository.save(seller);

        return ResponseEntity.ok("Seller details updated successfully.");
    }

}

