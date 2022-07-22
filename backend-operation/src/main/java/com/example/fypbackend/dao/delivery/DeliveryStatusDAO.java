package com.example.fypbackend.dao.delivery;

import com.example.fypbackend.entity.DeliveryStatus;

import java.util.List;

public interface DeliveryStatusDAO {

    public void newDeliveryStatus(DeliveryStatus deliveryStatus);

    public void batchNewDeliveryStatus(List<DeliveryStatus> deliveryStatuses);

    public List<DeliveryStatus> getStatusOfNoteId(int deliveryNoteId);

}
