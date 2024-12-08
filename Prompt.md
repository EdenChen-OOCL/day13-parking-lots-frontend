Background:
As a Parking Manager, I am responsible for managing three parking lots:
● The Plaza Park (9 parking capacity)
● City Mall Garage (12 parking capacity)
● Office Tower Parking (9 parking capacity)
I have employed three Parking Boys to help manage these parking lots, each utilizing a specific parking strategy:

1. Standard parking strategy
2. Smart parking strategy
3. Super Smart parking strategy

To optimize management and streamline operations, I need an application that assists me in visualizing and efficiently managing
the car parking and retrieval process, while also keeping track of the current usage of each parking lot.

你现在是一个很懂布局和审美的专业前端工程师。我需要你使用React，Ant Design，和axios实现一个停车管理系统的用户界面布局，包含以下元素：
1. **输入框**：
    - **车牌号输入框**：位于界面顶部左侧，显示为“Plate Number”，当前输入为“EV-1234”。

2. **下拉菜单**：
    - **停车类型选择**：位于车牌号输入框右侧，默认选项为“Standard”，可选择“Smart”和“SuperSmart”。

3. **按钮**：
    - **“Park”按钮**：位于界面右上角，蓝色背景。
    - **“Fetch”按钮**：紧邻“Park”按钮，蓝色背景。

4. **停车场布局**：
    - **The Plaza Park**：左侧区域，包含两个车位，分别停放车牌“AB-1234”和“CD-5678”。
    - **City Mall Garage**：中间区域，包含三个车位，分别停放车牌“EF-2234”、“GH-4467”和“ZV-9758”。
    - **Office Tower Parking**：右侧区域，包含两个车位，分别停放车牌“GF-1233”和“RR-8643”。

每个停车场区域用线条分隔，车牌号用绿色背景标识。

第一次迭代：
要求：
1. 实现停车场布局，包含三个停车场区域。
2. 从后端接口获取停车场信息，包括车位数量和已停车辆信息。

具体实现：
1. Create a Car Component(.jsx)
    1) context:
       1. none
    2) props:
       1. plateNumber: String
    3) method:
       1. none
    4) html and CSS:
       1. display the plateNumber in the center of the component, with a green background and front color is black. Border is 1px solid black.
2. Create a ParkingLotState Component(.jsx)
    1) context:
       1. none
    2) props: 
       1. parkingLotState: {
          "parkingLotId": 1,
          "parkingLotName": "The Plaza Park",
          "position": [
          "AB-1234",
          "",
          ""
          ]
          }
    3) method:
       1. none
    4) html and CSS:
       1. display the ParkingLotState with a table, where a row consist of 3 Car Component.
       column count is decided by the capacity/3. Use position.map() to generate the Car Component, the key is the plateNumber.
       bottom of the ParkingLotState, display the parkingLotName.
3. Create a ParkingLot Component(.jsx)
    1) context:
       1. createContext(parkingLotReducer, initialParkingLotState): ParkingLotContext
    2) props:
       1. parkingLotList: [
          {
          "parkingLotId": 1,
          "parkingLotName": "The Plaza Park",
          "position": [
          "AB-1234",
          "",
          ""
          ]
          },
          {
          "parkingLotId": 2,
          "parkingLotName": "City Mall Garage",
          "position": [
          "",
          "",
          ""
          ]
          },
          {
          "parkingLotId": 3,
          "parkingLotName": "Office Tower Parking",
          "position": [
          "",
          "",
          ""
          ]
          }
          ]
    3) method:
       1. useEffect(): fetch the parkingLotState from the backend, and dispatch the parkingLotState to the ParkingLotContext.
    4) html and CSS:
       1. display the ParkingLotState with a table, where a row consist of 3 ParkingLotState Component.
4. Create a ParkingAPI(.js)
    1) axios instant: axiosInstance = axios.create({ baseURL: "http://localhost:8080" }). 
       And use Interceptors to handle the response when the status is not 200.
    2) method:
       1. fetchParkingLotState(): 
          GET /parking-lot/status
          + request: none
          + response: [
            {
            "parkingLotId": 1,
            "parkingLotName": "Plaza Park",
            "capacity": 9,
            "position": [
            "AB-1234",
            ""
            ]
            }
            ]
          
       2. parkCar(plateNumber, parkingType): 
          POST /parking-car?parkingStrategyEnum=parkingType|FIRST_PARKING_LOT
          + request: {
            "plateNumber": "AB-1234",
            }
          + response: {
            "plateNumber": "AB-9999",
            "position": 1,
            "parkingLot": 1
            }
       3. fetchCar(ticket): 
          DELETE /parking-car
          + request: {
            "plateNumber": "AB-9999",
            "position": null,
            "parkingLot": null
            }
          + response: {
            "plateNumber": "AB-9999"
            }

第二次迭代：
要求：
1. 实现车牌输入框，停车类型选择下拉菜单，Park按钮和Fetch按钮。

具体实现：
1. Create a ParkingLotManager Component(.jsx)
    1) context:
       1. useContext(ParkingLotContext)
    2) props:
       1. none
    3) variables:
       1. plateNumber: useState("")
       2. parkingType: useState("FIRST_PARKING_LOT")
    4) method:
       1. changePlateNumber(event): set the plateNumber to the event.target.value.
       2. changeParkingType(event): set the parkingType to the event.target.value.
       3. parkCar(): call the parkCar method of the ParkingAPI with the plateNumber and parkingType.
       4. fetchCar(): call the fetchCar method of the ParkingAPI with the ticket. ticket is like: {
          "plateNumber": "AB-9999",
          "position": null,
          "parkingLot": null
          }
    5) html and CSS:
       1. display the plateNumber input box, with a placeholder "Plate Number".
       2. display the parkingType select box, with options "Standard", "Smart" and "SuperSmart". These options refer to value, include "FIRST_PARKING_LOT"|"SMART_PARKING_LOT"|"MAX_AVAILABLE_RATE_PARKING_LOT".
       3. display the Park button, with a click event to call the parkCar method.
       4. display the Fetch button, with a click event to call the fetchCar method.
2. update parkingLotReducer to handle the PARK_CAR and FETCH_CAR action. 
   When PARK_CAR action is dispatched, update the parkingLotState with the new car position.
   When FETCH_CAR action is dispatched, update the parkingLotState with the new car position.

第三次迭代：
要求：
1. 实现全局异常处理，处理NoAvailablePositionException，UnrecognizedTicketException，InvalidLicensePlateException，Exception。

具体实现：
1. 把所有的axios请求都放在try-catch块中，当请求失败时，弹出一个alert框，显示请求失败的原因。
2. 当请求失败时，弹出alert框的内容是根据response.data.body来显示的。并且切断该请求后续的解析处理。