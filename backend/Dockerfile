# Use an official JDK image
FROM eclipse-temurin:23-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper & source
COPY . .

# Build the app
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "target/app.jar"]
