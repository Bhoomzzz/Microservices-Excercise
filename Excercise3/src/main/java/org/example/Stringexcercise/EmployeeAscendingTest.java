package org.example.Stringexcercise;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class EmployeeAscendingTest {

    public static void main(String[] args) {

        List<Employee> employees = Arrays.asList(
                new Employee(101, "Bhumika", "Detroit", 85000),
                new Employee(102, "John", "Chicago", 75000),
                new Employee(103, "David", "New York", 90000),
                new Employee(104, "Emma", "Boston", 70000),
                new Employee(105, "Sophia", "Seattle", 95000),
                new Employee(106, "Michael", "Dallas", 82000),
                new Employee(107, "James", "Austin", 78000),
                new Employee(108, "Olivia", "Phoenix", 87000),
                new Employee(109, "William", "Miami", 83000),
                new Employee(110, "Ava", "Atlanta", 76000)
        );

        employees.stream()
                .sorted(Comparator.comparing(Employee::getCity))
                .forEach(emp ->
                        System.out.println(
                                emp.getCity() + " - " + emp.getSalary()
                        )
                );
    }
}