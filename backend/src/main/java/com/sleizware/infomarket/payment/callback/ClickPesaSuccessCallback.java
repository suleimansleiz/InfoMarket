package com.sleizware.infomarket.payment.callback;

public class ClickPesaSuccessCallback {
    private String event;
    private CallbackData data;

    public static class CallbackData {
        private String paymentId;
        private String orderReference;
        private String collectedAmount;
        private String collectedCurrency;
        private String status;
        private Customer customer;
        private String createdAt;
        private String updatedAt;

        public static class Customer {
            private String name;
            private String email;
            private String phone;

            // Getters and Setters

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getEmail() {
                return email;
            }

            public void setEmail(String email) {
                this.email = email;
            }

            public String getPhone() {
                return phone;
            }

            public void setPhone(String phone) {
                this.phone = phone;
            }
        }

        // Getters and Setters


        public String getPaymentId() {
            return paymentId;
        }

        public void setPaymentId(String paymentId) {
            this.paymentId = paymentId;
        }

        public String getOrderReference() {
            return orderReference;
        }

        public void setOrderReference(String orderReference) {
            this.orderReference = orderReference;
        }

        public String getCollectedAmount() {
            return collectedAmount;
        }

        public void setCollectedAmount(String collectedAmount) {
            this.collectedAmount = collectedAmount;
        }

        public String getCollectedCurrency() {
            return collectedCurrency;
        }

        public void setCollectedCurrency(String collectedCurrency) {
            this.collectedCurrency = collectedCurrency;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Customer getCustomer() {
            return customer;
        }

        public void setCustomer(Customer customer) {
            this.customer = customer;
        }

        public String getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }

        public String getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(String updatedAt) {
            this.updatedAt = updatedAt;
        }
    }

    // Getters and Setters

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public CallbackData getData() {
        return data;
    }

    public void setData(CallbackData data) {
        this.data = data;
    }
}

