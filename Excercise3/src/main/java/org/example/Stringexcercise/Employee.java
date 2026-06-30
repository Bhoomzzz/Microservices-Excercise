package org.example.Stringexcercise;

public class Employee {

    private int id;
    private String name;
    private String city;
    private double salary;

    // Default Constructor
    public Employee() {
    }

    // Parameterized Constructor
    public Employee(int id, String name, String city, double salary) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.salary = salary;
    }

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for city
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Getter and Setter for salary
    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
