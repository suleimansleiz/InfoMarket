package com.sleizware.infomarket.payment.callback;

import com.sleizware.infomarket.payment.PurchaseIntent;
import com.sleizware.infomarket.payment.PurchaseIntentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/infomarket/v1/payments")
public class CallbackController {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private PurchaseIntentRepository purchaseIntentRepository;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/success/callbacks")
    public ResponseEntity<String> handleSuccessCallback(@RequestBody ClickPesaSuccessCallback callback) {
        var data = callback.getData();
        String orderRef = data.getOrderReference();

        Optional<PurchaseIntent> intentOpt = purchaseIntentRepository.findByOrderReference(orderRef);
        if (intentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order reference not found");
        }

        PurchaseIntent intent = intentOpt.get();
        intent.setStatus("SUCCESS");
        purchaseIntentRepository.save(intent);

        Sales sales = new Sales();
        sales.setPaymentId(data.getPaymentId());
        sales.setItemName(orderRef);
        sales.setAmount(data.getCollectedAmount());
        sales.setCreatedAt(data.getCreatedAt());
        sales.setStatus(data.getStatus());
        sales.setCustomerPhone(data.getCustomer().getPhone());

        salesRepository.save(sales);

        // Optionally notify seller + buyer here via email/SMS

        // Call another endpoint to update item status
        String updateUrl = "http://localhost:8080/api/infomarket/v1/items/" + data.getOrderReference() + "/mark-sold";
        restTemplate.put(updateUrl, null);

        return ResponseEntity.ok("Callback handled successfully");
    }

    @GetMapping("/sales")
    public ResponseEntity<List<Sales>> getAllSales() {
        return new ResponseEntity<>(salesRepository.findAll(), HttpStatus.OK);
    }
}
