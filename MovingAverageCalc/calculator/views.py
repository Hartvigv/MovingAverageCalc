from django.http import JsonResponse
import os
import json

filename = 'input_data.json'

def load_json_data():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'data', filename)

    with open(file_path, 'r') as file:
        return json.load(file)

def keys(request):
    data = load_json_data()
    keys = list(data.keys()) 
    return JsonResponse({"keys": keys})

def moving_average(request, data_id, sma_period):
    sma_period = int(sma_period)
    data = load_json_data()

    if data_id not in data:
        return JsonResponse({"error": "Invalid instrument ID"}, status=400)

    inst_data = data[data_id]
    prices = [entry["price"] for entry in inst_data]

    def is_a_number (window):
        if not all(isinstance(price, (int, float)) for price in window):
            print (window)
            return False 
        
        return True

    sma_results = []
    for i in range(sma_period - 1, len(prices)):
        window = prices[i - sma_period + 1:i + 1]

        if not is_a_number(window):
            continue

        sma = sum(window) / sma_period
        sma_results.append({
            "date": inst_data[i]["date"],
            "price": round(sma, 2)
        })

    return JsonResponse({
        "instrument": data_id,
        "original_data": inst_data,
        "sma_data": sma_results
    }, safe=False)