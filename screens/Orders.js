import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { icons, SIZES, COLORS, FONTS } from '../constants';
import { stateData, orderData, restaurantData } from '../data/restaurant';

const Orders = () => {

    const [states, setStates] = useState(stateData);
    const [selectedState, setSelectedState] = useState(null);
    const [orders, setOrders] = useState(orderData);

    function onSelectState(state) {
        //filter states
        let orderList = [];
        if (state.id === 0)
            orderList = [...orderData];
        else
            orderList = orderData.filter(a => a.state === state.id);

        setOrders(orderList);
        setSelectedState(state);
    }

    function getTypeNameById(id) {
        let type = restaurantData[0].menu.filter(a => a.menuId == id);

        if(type.length > 0)
            return type[0].name;
        
        return "";
    }

    /*const changeState = (order, stateId) => {
        console.info(order);
        let ordersUpdate = orders.map(item => item.id === order.id ? {...item, state: stateId} : item);
        setOrders(ordersUpdate);
    }*/

    function renderHeader() {
        return (
            <View style={{flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    //onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.search}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* Restaurant Name */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Listado de Ordenes</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    //onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.list}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainStates() {
        const renderItem = ({item}) => {
            return(
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedState?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectState(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (selectedState?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedState?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Estados</Text>
                <FlatList 
                    data={states}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
                />
            </View>
        );
    }

    function renderOrderList() {

        const renderItem = ({item}) => {
            return (
                <View
                    style={{
                        marginBottom: SIZES.padding * 2,
                        paddingLeft: SIZES.padding,
                        width: '100%',
                        height: 220,
                        borderWidth: 2,
                        borderColor: (item.state === 1) ? COLORS.registered : ((item.state === 2) ? COLORS.finished : COLORS.rejected),
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        ...styles.shadow,
                    }}
                >
                    <Text style={{ ...FONTS.body2}}>Fecha: {item.date}</Text>
                    <View style={{paddingLeft: SIZES.padding * 2}}>
                        {item.order.map(orderItem => {
                            return(
                                <Text style={{ ...FONTS.body3, marginBottom:SIZES.padding/2 }}>{orderItem.qty} x {getTypeNameById(orderItem.type)}: S/.{orderItem.tot.toFixed(2)}</Text>
                            )
                        })}
                    </View>
                    <Text style={{ ...FONTS.body2 }}>Total: S/.{item.tot.toFixed(2)}</Text>
                    {item.state === 1 && (
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZES.padding * 2,
                                paddingHorizontal: SIZES.padding,
                                justifyContent: 'space-between'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    height: 50,
                                    marginRight: 10,
                                    backgroundColor: COLORS.finished,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}
                                //onPress={changeState(item, 2)}
                            >
                                <Text style={{ ...FONTS.h4, color: COLORS.white }}>Finalizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    height: 50,
                                    backgroundColor: COLORS.rejected,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}
                                //onPress={() => navigation.goBack()}
                            >
                                <Text style={{ ...FONTS.h4, color: COLORS.white }}>Anular</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                </View>
            )
        }

        return(
            <FlatList
                data={orders}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainStates()}
            {renderOrderList()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Orders;