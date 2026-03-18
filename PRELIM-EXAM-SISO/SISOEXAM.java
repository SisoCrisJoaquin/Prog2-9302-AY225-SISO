/**
 * Student Record System
 * Name: Siso, Cris Joaquin E.
 * ID: 112-0080
 */

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.*;
import java.io.*;

/**
 * Student Record System - Simple Java Swing Application
 * Author: SISO
 */
public class SISOEXAM extends JFrame {
    
    private JTable studentTable;
    private DefaultTableModel tableModel;
    private JTextField idField, nameField, gradeField;
    private JButton addButton, deleteButton;
    private JLabel countLabel;
    
    public SISOEXAM() {
        setTitle("Records - Siso, Cris Joaquin E. 112-0080");
        setSize(700, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        initComponents();
        loadCSVData();
        
        setVisible(true);
    }
    
    private void initComponents() {
        setLayout(new BorderLayout(5, 5));
        
        // Table
        String[] columns = {"Student ID", "Name", "Grade"};
        tableModel = new DefaultTableModel(columns, 0);
        studentTable = new JTable(tableModel);
        studentTable.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        
        JScrollPane scrollPane = new JScrollPane(studentTable);
        scrollPane.setBorder(BorderFactory.createTitledBorder("Student Records"));
        add(scrollPane, BorderLayout.CENTER);
        
        // Top Panel - Input Form
        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 5));
        topPanel.setBorder(BorderFactory.createTitledBorder("Add Student"));
        
        topPanel.add(new JLabel("ID:"));
        idField = new JTextField(8);
        topPanel.add(idField);
        
        topPanel.add(new JLabel("Name:"));
        nameField = new JTextField(12);
        topPanel.add(nameField);
        
        topPanel.add(new JLabel("Grade:"));
        gradeField = new JTextField(6);
        topPanel.add(gradeField);
        
        addButton = new JButton("Add");
        addButton.addActionListener(e -> addStudent());
        topPanel.add(addButton);
        
        deleteButton = new JButton("Delete");
        deleteButton.addActionListener(e -> deleteStudent());
        topPanel.add(deleteButton);
        
        add(topPanel, BorderLayout.NORTH);
        
        // Bottom Panel - Statistics
        JPanel bottomPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 20, 5));
        bottomPanel.setBorder(BorderFactory.createEtchedBorder());
        
        countLabel = new JLabel("Total Students: 0");
        bottomPanel.add(countLabel);
        
        add(bottomPanel, BorderLayout.SOUTH);
    }
    
    private void loadCSVData() {
        try {
            BufferedReader br = new BufferedReader(new FileReader("MOCK_DATA.csv"));
            String line;
            boolean firstLine = true;
            
            while ((line = br.readLine()) != null) {
                if (firstLine) {
                    firstLine = false;
                    continue;
                }
                
                String[] values = line.split(",");
                if (values.length >= 8) {
                    String id = values[0].trim();
                    String name = values[1].trim() + " " + values[2].trim();
                    
                    double lab1 = Double.parseDouble(values[3].trim());
                    double lab2 = Double.parseDouble(values[4].trim());
                    double lab3 = Double.parseDouble(values[5].trim());
                    double prelim = Double.parseDouble(values[6].trim());
                    double attendance = Double.parseDouble(values[7].trim());
                    
                    double labAvg = (lab1 + lab2 + lab3) / 3;
                    double classStanding = (attendance * 0.40) + (labAvg * 0.60);
                    double requiredPass = (75 - (classStanding * 0.70)) / 0.30;
                    double requiredExcellent = (100 - (classStanding * 0.70)) / 0.30;
                    
                    tableModel.addRow(new Object[]{id, name, String.format("%.2f", classStanding)});
                }
            }
            br.close();
            updateStatistics();
            
        } catch (FileNotFoundException e) {
            JOptionPane.showMessageDialog(this, "MOCK_DATA.csv not found!", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this, "Error reading file: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Error parsing grades", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
    
    private void updateStatistics() {
        int count = tableModel.getRowCount();
        countLabel.setText("Total Students: " + count);
    }
    
    private void addStudent() {
        String id = idField.getText().trim();
        String name = nameField.getText().trim();
        String grade = gradeField.getText().trim();
        
        if (id.isEmpty() || name.isEmpty() || grade.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please fill all fields", "Error", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        tableModel.addRow(new Object[]{id, name, grade});
        updateStatistics();
        
        idField.setText("");
        nameField.setText("");
        gradeField.setText("");
        idField.requestFocus();
    }
    
    private void deleteStudent() {
        int row = studentTable.getSelectedRow();
        if (row == -1) {
            JOptionPane.showMessageDialog(this, "Select a row to delete", "Error", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        int confirm = JOptionPane.showConfirmDialog(this, "Delete this student?", "Confirm", JOptionPane.YES_NO_OPTION);
        if (confirm == JOptionPane.YES_OPTION) {
            tableModel.removeRow(row);
            updateStatistics();
        }
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new SISOEXAM());
    }
}
