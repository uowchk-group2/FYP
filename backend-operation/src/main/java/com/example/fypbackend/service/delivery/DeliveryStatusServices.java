package com.example.fypbackend.service.delivery;

import com.example.fypbackend.entity.DeliveryStatus;

import java.util.List;

public interface DeliveryStatusServices {

    public void newDeliveryStatus(DeliveryStatus deliveryStatus);

    public void batchNewDeliveryStatus(List<DeliveryStatus> deliveryStatuses);

    public List<DeliveryStatus> getStatusOfNoteId(int deliveryNoteId);

}
