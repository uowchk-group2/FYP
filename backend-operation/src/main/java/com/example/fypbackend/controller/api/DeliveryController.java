package com.example.fypbackend.controller.api;

import com.example.fypbackend.entity.DeliveryNote;
import com.example.fypbackend.entity.DeliveryStatus;
import com.example.fypbackend.service.delivery.DeliveryNoteServices;
import com.example.fypbackend.service.delivery.DeliveryStatusServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    private DeliveryNoteServices deliveryNoteServices;
    private DeliveryStatusServices deliveryStatusServices;

    @Autowired
    public DeliveryController(DeliveryNoteServices deliveryNoteServices, DeliveryStatusServices deliveryStatusServices) {
        this.deliveryNoteServices = deliveryNoteServices;
        this.deliveryStatusServices = deliveryStatusServices;
    }

    @PostMapping("/note")
    public DeliveryNote newDeliveryNote(@RequestBody DeliveryNote deliveryNote) {
        deliveryNoteServices.newDeliveryNote(deliveryNote);
        return deliveryNote;
    }

    @PostMapping("/batchStatus")
    public List<DeliveryStatus> batchNewDeliveryStatus(@RequestBody List<DeliveryStatus> deliveryStatuses) {
        deliveryStatusServices.batchNewDeliveryStatus(deliveryStatuses);
        return deliveryStatuses;
    }

    @PostMapping("/status")
    public DeliveryStatus newDeliveryStatus(@RequestBody DeliveryStatus deliveryStatus) {
        deliveryStatusServices.newDeliveryStatus(deliveryStatus);
        return deliveryStatus;
    }

    @GetMapping("/note/{deliveryNoteId}")
    public DeliveryNote getDeliveryNoteById(@PathVariable int deliveryNoteId) {
        return deliveryNoteServices.findByDeliveryNoteId(deliveryNoteId);
    }

    @GetMapping("/note/findByOrderId/{orderId}")
    public List<DeliveryNote> findByOrderId(@PathVariable int orderId) {
        return deliveryNoteServices.findByOrderId(orderId);
    }

    @GetMapping("/note/findByDriverId/{driverId}")
    public List<DeliveryNote> findByDriverId(@PathVariable int driverId) {
        return deliveryNoteServices.findByDriverId(driverId);
    }

    @GetMapping("/status/{noteId}")
    public List<DeliveryStatus> findStatusByNoteId(@PathVariable int noteId) {
        return deliveryStatusServices.getStatusOfNoteId(noteId);
    }
}
