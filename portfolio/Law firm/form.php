<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];
    
    // Sanitize and validate form inputs
    $fullname = htmlspecialchars($_POST['fullname']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    
    if (empty($fullname)) {
        $errors[] = "Full name is required.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    if (empty($message)) {
        $errors[] = "Message cannot be empty.";
    }

    if (empty($errors)) {
        // Email parameters
        $to = "your_email@example.com"; // Replace with your email address
        $subject = "New Form Submission";
        $email_body = "Full Name: $fullname\nEmail: $email\nMessage:\n$message";

        // Send email
        if (mail($to, $subject, $email_body)) {
            header('Location: kontakt-bs.html');
            exit;
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
    } else {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }

    error_reporting(E_ALL);
ini_set('display_errors', 1);
}
?>